import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { PAIR_DEVICES } from '@/constants/devices'
import cn from '@/lib/cn'
import type { Device } from '@/types/spotify'

import { CPU } from './icons'

interface DevicePopoverProps {
  show: boolean
  devices?: Device[]
}

const DevicePopover = ({ show, devices }: DevicePopoverProps) => {
  const availableDevices = devices?.map((device) => ({
    ...device,
    icon: PAIR_DEVICES[device?.type]?.icon || <CPU />,
  }))

  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className={cn('absolute bottom-10 right-0 z-30 w-max')}>
        <div
          className={cn(
            'flex flex-col gap-5 p-4 overflow-hidden rounded-md shadow-lg bg-card ring-1 ring-card ring-opacity-5',
          )}
        >
          {availableDevices?.map((device, index) => (
            <div
              key={index}
              className={cn('flex items-center w-full justify-between gap-3')}
            >
              <div className={cn('text-foreground')}>{device?.icon}</div>
              <div className={cn('flex flex-col flex-grow pl-0.5 pr-2')}>
                <span
                  className={cn(
                    'font-medium font-plus-jakarta text-foreground',
                  )}
                >
                  {device?.name}
                </span>
                <span className={cn('text-xs text-muted-foreground')}>
                  {device?.model}
                </span>
              </div>
              {device?.is_active ? (
                <div className={cn('equalizer')}>
                  <span className={cn('bar bg-foreground')} />
                  <span className={cn('bar bg-foreground')} />
                  <span className={cn('bar bg-foreground')} />
                  <span className={cn('bar bg-foreground')} />
                  <span className={cn('bar bg-foreground')} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default DevicePopover
