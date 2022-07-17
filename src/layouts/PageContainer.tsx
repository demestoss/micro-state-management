import { FC, ReactNode, useState } from "react";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const [, setState] = useState(0)

    const inc = () => setState(s => s  + 1)

    return <div className="mx-auto w-6/12 mt-5">
        {children}
        <button className="border-2 border-red-400 text-red-400 rounded-md p-2 px-5 hover:border-red-500 hover:text-red-500" onClick={inc}>
            Rerender App
        </button>
    </div>
}

export { PageContainer };