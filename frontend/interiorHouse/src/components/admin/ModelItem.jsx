import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import '../../static/styles/admin/modelItem.css';

const ModelItem = function ({client, model}) {
	const [rows, setRows] = useState([])
	const [fields, setFields] = useState([])
	useEffect(() => {
		fetchRows()
		// eslint-disable-next-line
	}, [])


	async function fetchRows() {
		const response = await client.get("/admin/models/"+model)
		if (response.data){
			setFields(Object.keys(response.data[0]))
			setRows(response.data)
		}
	}
	return(
		<div>
			<h1>{model}</h1>
			<div className="table">
				<div className="fields">
					{fields.map(field =>
						<div className="field" key={field}>
							<h3>{field}</h3>
						</div>
					)}
				</div>
				<div className="records">
					{rows.map(row =>
						<div key={row.Id} className="tb_row">
							{fields.map(col =>
								<div key={row.Id+col} className="tb_col">
									// show data
									<p>{JSON.stringify(row[col])}</p>
								</div>
							)}
							<Link className="linkChangeRecord" to="/admin/models/changeRecord" state={{ fields:fields, model:"" ,record: row }}>Change</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}


export default ModelItem;