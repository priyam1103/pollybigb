import React from "react";

export default function TextInput({
  label,
  value,
  key,
  placeholder,
  onChange,
  type
}) {
  return (
    <div className="mt-6" key={key}>
      <label className="block text-sm font-medium leading-5 text-bb-gray-700">
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          type={type==="password"?"password":"text"}
          required=""

          onChange={e => onChange(e)}
          defaultValue={value}
          placeholder={placeholder}
          className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 undefined"
          value={value}
        />
      </div>
    </div>
  );
}
