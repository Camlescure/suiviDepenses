function Depenses({data}){
    return <div className="p-4 table m-auto w-1/2 text-center">
        <div className="table-row">
            <div className="border p-2 table-cell">Titre</div>
            <div className="border p-2  table-cell">Montant</div>
            <div className="border p-2 table-cell">Type</div>
        </div>
        {data.map((dep) => (
            <div className="table-row">
                    <div className="border p-2 table-cell">{dep.titre}</div>
                    <div className="border p-2 table-cell">{dep.montant}</div>
                    <div className="border p-2 table-cell">{dep.type}</div>
            </div>
        ))}
    </div>
}

export default Depenses;