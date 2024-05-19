export const Balance = ({value}) => {
    return(<div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="ml-4 text-lg font-semibold">
            Rs {value}
        </div>
    </div>)
}