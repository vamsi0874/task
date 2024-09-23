// import { CheckCircledIcon } from "@radix-ui/react-icons"

// import { CheckCircle2Icon } from "lucide-react"

export const FormSuccess = ({message}) => {
  
    if(!message) return null
    return (
      <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        {/* <CheckCircledIcon/> */}
      <p>
        {message}
      </p>
    </div>
  )
}
