from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.router.user import user_router
from app.router.student_router import student_router
from app.router.oauth_router import oauth_router
from app.router.auth_router import auth_router
from app.router.teacher import teacher_router
from app.router.verification import verification_router
from app.database import create_db_and_tables
from typing import AsyncIterator
from fastapi.middleware.cors import CORSMiddleware


# lifespan function
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    try:
        create_db_and_tables()
        yield
    except Exception as e:
        print(f"Error during startup: {e}")


# Initialize the FastAPI app
app = FastAPI(lifespan=lifespan, title="Panaversity User Management and Authentication", 
    version="0.0.1",
    servers=[
            {
                "url": "http://localhost:8000", # ADD NGROK URL Here Before Creating GPT Action
                "description": "Development Server"
            },
            {
                "url": "https://localhost:8000",
                "description": "Production Server"
            }
        ]
    ) 

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    try:
        body = await request.body()
        body_str = body.decode("utf-8")
    except Exception:
        body_str = "unable to read body"
    
    # Sanitize pydantic validation errors so they are JSON serializable
    sanitized_errors = []
    for error in exc.errors():
        error_copy = dict(error)
        if "ctx" in error_copy:
            ctx_copy = {}
            for k, v in error_copy["ctx"].items():
                if isinstance(v, Exception):
                    ctx_copy[k] = str(v)
                else:
                    ctx_copy[k] = str(v)
            error_copy["ctx"] = ctx_copy
        sanitized_errors.append(error_copy)

    print(f"Validation Error: {sanitized_errors} for body: {body_str}")
    return JSONResponse(
        status_code=422,
        content={"detail": sanitized_errors, "body": body_str}
    )

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Adjust to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prefix = "/api/v1"

@app.get("/", tags=["Root"])
def root():
    return {"message": "This is just an authentication service. Please visit http://localhost:8000/docs to see the API documentation."}

app.include_router(user_router, prefix=f"{prefix}/user", tags=["User"])
app.include_router(verification_router, prefix=f"{prefix}/user", tags=["User"])
app.include_router(teacher_router, prefix=f"{prefix}/teacher", tags=["Teacher"])
app.include_router(student_router, prefix=f"{prefix}/student", tags=["Student"])
app.include_router(oauth_router, prefix=f"{prefix}/oauth", tags=["OAuth"])
app.include_router(auth_router, prefix=f"{prefix}/auth", tags=["Auth"])


for route in app.routes:
    print(route.path, route.name)
