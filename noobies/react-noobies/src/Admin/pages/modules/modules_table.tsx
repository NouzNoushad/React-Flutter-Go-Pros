import MainModulesSideAction from "./modules_side_action";

export default function MainModulesTable() {

    return (
        <div className="">
            {
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='border-b-[0.5px] border-dashed border-b-gray-500'>
                            <th className='min-w-[20px] text-start font-semibold text-[13px] uppercase py-4 '><span>Sl no</span></th>
                            <th className='min-w-[100px] text-start font-semibold text-[13px] uppercase py-4 '><span>Title</span></th>
                            <th className='min-w-[150px] text-start font-semibold text-[13px] uppercase py-4 '><span>Description</span></th>
                            <th className='min-w-[100px] text-start font-semibold text-[13px] uppercase py-4 '><span>Video</span></th>
                            <th className='min-w-[70px] text-center font-semibold text-[13px] uppercase py-4 '><span>Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Users */}
                        {
                            [1, 2, 3, 4, 5, 6].map(function (mainCategory, index) {
                                return (
                                    <tr key={index} className={`border-b-[0.5px] border-dashed border-b-gray-500`}>
                                        <td className='py-4 text-start'>
                                            <div className='text-sm font-semibold'>{mainCategory}</div>
                                        </td>
                                        <td className='py-4 text-start px-2'>
                                            <div className='text-sm font-normal  break-words whitespace-normal'>Title</div>
                                        </td>
                                        <td className='py-4 text-start px-2'>
                                            <div className='text-sm font-normal  break-all whitespace-normal'>Description</div>
                                        </td>
                                        <td className='py-4 text-start px-2'>
                                            <div className='text-sm font-normal  break-all whitespace-normal'>example.m3u8</div>
                                        </td>
                                        <td className='py-4 text-center px-2 relative'>
                                            <MainModulesSideAction />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
