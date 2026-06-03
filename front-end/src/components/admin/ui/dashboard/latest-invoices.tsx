import { RotateCcwIcon } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '../../ui/fonts';
import placeholderData from '@/src/components/admin/lib/placeholder-data';

export default async function LatestInvoices() {
  const latestInvoices = placeholderData.invoices.slice(0, 5).map((invoice) => {
    const customer = placeholderData.customers.find((c) => c.id === invoice.customer_id);
    return {
      id: invoice.customer_id + invoice.date,
      name: customer ? customer.name : 'Unknown',
      email: customer ? customer.email : '',
      image_url: customer ? customer.image_url : '/customers/placeholder.png',
      amount: '$' + (invoice.amount / 100).toFixed(2)
    };
  });

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="relative mr-4 h-8 w-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500 border">
                    {invoice.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RotateCcwIcon className="h-5 w-5 text-gray-500 animate-spin-slow" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
