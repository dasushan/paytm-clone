import { useEffect, useState } from 'react';
import { Button } from './Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // debouncing
  useEffect(()=>{
      axios.get('http://localhost:3000/api/v1/user/bulk?filter='+ filter)
        .then((response) =>{
          setUsers(response.data.user)
        })
  }, [filter])
  return (
    <>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input onChange={(e)=>{
          setFilter(e.target.value)
        }}
          type="text"
          placeholder="Search users..."
          className="w-full border rounded border-slate-200 py-1 px-2"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="bg-slate-200 w-12 h-12 rounded-full flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Button onPress={(e)=>{
            navigate("/send?id="+user._id+"&name="+user.firstName)
        }} label={'Send Money'} />
      </div>
    </div>
  );
}
