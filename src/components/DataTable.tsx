interface DataTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

/**
 * Render a markdown subset (**bold**) as HTML.
 * Used for table cells coming straight from markdown content.
 */
function mdToHtml(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

const DataTable = ({ headers, rows, className = "" }: DataTableProps) => (
  <div className={`overflow-x-auto my-6 ${className}`.trim()}>
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-secondary">
          {headers.map((h, i) => (
            <th
              key={i}
              className="border border-border px-3 py-2 text-left font-semibold"
              dangerouslySetInnerHTML={{ __html: mdToHtml(h) }}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
            {row.map((cell, ci) => (
              <td
                key={ci}
                className="border border-border px-3 py-2 align-top"
                dangerouslySetInnerHTML={{ __html: mdToHtml(cell) }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
