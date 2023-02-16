import React from 'react';
import { useLocation } from 'react-router-dom'

import '../../static/styles/admin/changeRecord.css';

const ChangeRecord = function ({client}) {
    const state = useLocation().state
    console.log(state)
	return(
		<div className="ChangeRecord">
			{state.fields.map(col =>
				<div className="field_record">
					<h3>{col}</h3>
					<p>{ JSON.stringify(state.record[col]) }</p>
				</div>
			)}
        </div>
	)
}

export default ChangeRecord;