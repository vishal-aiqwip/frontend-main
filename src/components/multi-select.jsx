// "use client"

// import { Check, ChevronsUpDown, Loader } from "lucide-react"
// import { cn } from "@/lib/utils"
// import {
//   Command,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Badge } from "@/components/ui/badge"
// import { useState } from "react"

// export function MultiSelectDropdown({
//   values = [],
//   onChange,
//   items = [],
//   placeholder = "Select",
//   disabled = false,
//   isPending = false,
//   className,
// }) {
//   const [open, setOpen] = useState(false)

//   const toggleValue = (value) => {
//     if (values.includes(value)) {
//       onChange(values.filter((v) => v !== value))
//     } else {
//       onChange([...values, value])
//     }
//   }

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger
//         className={cn(
//           "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
//           disabled && "opacity-50",
//           className
//         )}
//         disabled={disabled}
//       >
//         {values.length ? (
//           <div className="flex flex-wrap gap-1">
//             {values.map((v) => {
//               const item = items.find((i) => i.value === v)
//               return (
//                 <Badge key={v} variant="secondary">
//                   {item?.label}
//                 </Badge>
//               )
//             })}
//           </div>
//         ) : (
//           <span className="text-muted-foreground">{placeholder}</span>
//         )}
//         <ChevronsUpDown className="h-4 w-4 opacity-50" />
//       </PopoverTrigger>

//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandList>
//             <CommandGroup>
//               {isPending ? (
//                 <div className="flex h-14 items-center justify-center gap-2">
//                   <Loader className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </div>
//               ) : (
//                 items.map(({ label, value }) => (
//                   <CommandItem
//                     key={value}
//                     onSelect={() => toggleValue(value)}
//                   >
//                     <div
//                       className={cn(
//                         "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
//                         values.includes(value) &&
//                           "bg-primary text-primary-foreground"
//                       )}
//                     >
//                       {values.includes(value) && <Check className="h-3 w-3" />}
//                     </div>
//                     {label}
//                   </CommandItem>
//                 ))
//               )}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }


"use client"

import { Check, ChevronsUpDown, Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function MultiSelectDropdown({
  value = [],
  onValueChange,
  items = [],
  placeholder = "Select",
  disabled = false,
  isPending = false,
  className,
}) {
  const [open, setOpen] = useState(false)

  const toggle = (val) => {
    if (value.includes(val)) {
      onValueChange(value.filter((v) => v !== val))
    } else {
      onValueChange([...value, val])
    }
  }

  const selectedItems = items.filter((item) => value.includes(item.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex min-h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
          disabled && "opacity-50",
          className
        )}
      >
        {selectedItems.length ? (
          <div className="flex flex-wrap gap-1">
            {selectedItems.map((item) => (
              <Badge key={item.value} variant="secondary">
                {item.label}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="max-w-full! p-0">
        <Command className={"max-w-full! "}> 
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {isPending ? (
                <div className="flex h-14 items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                items.map((item) => {
                  const isSelected = value.includes(item.value)
                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => toggle(item.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected && "bg-primary text-primary-foreground"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      {item.label}
                    </CommandItem>
                  )
                })
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
