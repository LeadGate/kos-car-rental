interface SupplierTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

const SupplierTable = ({ headers, rows, caption }: SupplierTableProps) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-zebra border border-border rounded-lg overflow-hidden">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-sm font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-t border-border">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={
                      cellIdx === 0
                        ? "px-4 py-3 font-medium text-foreground"
                        : "px-4 py-3 text-muted-foreground text-sm"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="text-xs text-muted-foreground mt-3">{caption}</p>
      )}
    </div>
  );
};

export default SupplierTable;
