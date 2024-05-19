import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name")
  const [amount, setAmount] = useState(0)
  return (
      
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 w-12 h-12 rounded-full flex justify-center items-center">
                  <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e)=>{
                      setAmount(e.target.value)
                    }}
                    type="number"
                    className="flex rounded-md border border-input w-full h-10 bg-background text-sm px-3 py-2"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <button onClick={()=>{
                    axios.post("http://localhost:3000/api/v1/account/transfer", {
                      to: id,
                      amount
                    }, {
                      headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                      }
                    })
                }}className="bg-green-500 w-full h-10 text-sm font-medium text-white py-2 px-4 rounded-md justify-center  ring-offset-background transition-colors">
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};
