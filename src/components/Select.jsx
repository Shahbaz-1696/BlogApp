/* eslint-disable react/prop-types */
import React, {useId} from 'react'

function Select({
    label,
    options,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label className='' htmlFor={id}></label>}
      <select 
      {...props}
      id={id}
      ref={ref}
      className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none duration-200 border border-gray-200 focus:bg-gray-50 ${className}`}
      >
        {options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
