import React from 'react';
import { Tab } from '@headlessui/react';
import { configColors } from '@/constant/configColors';
import { useAppSelector } from '@/lib/hooks/useRedux';

const Tabs: React.FC<{ data: { [key: string]: React.ReactNode } }> = ({
  data,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);

  const bgColor =
    configColors[accentColor as keyof typeof configColors].bgColor[100];
  const colorText =
    configColors[accentColor as keyof typeof configColors].textColor[100];

  const className = `w-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-${accentColor} rounded`;

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className={`flex space-x-1 ${bgColor} dark:bg-dark p-1`}>
          {Object.keys(data).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                selected
                  ? `${className} bg-white dark:bg-dark-third shadow ${colorText}`
                  : `${className} text-white hover:bg-white/[0.12] hover:text-white`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(data).map((element, idx) => (
            <Tab.Panel key={idx}>{element}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default React.memo(Tabs);
