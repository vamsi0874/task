import React from 'react'

export const EmployeeData = ({employee}) => {
  console.log(employee)
  return (
    <>
                  <td className="border p-2">{employee._id}</td>
                  <td className="border p-2"><img src={`/src/images/${employee.image}`} height={100} width={100}/></td>
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.mobile}</td>
                  <td className="border p-2">{employee.designation}</td>
                  <td className="border p-2">{employee.gender}</td>
                  <td className="border p-2">{employee.course.join(', ')}</td>
                  <td className="border p-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
    </>
  )
}
