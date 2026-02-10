import React from 'react';

const Table = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-100">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4">
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="px-6 py-4 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-400">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
