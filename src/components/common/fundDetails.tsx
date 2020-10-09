import { FundName } from 'apiTypes'
import React from 'react'



interface Props {
    data?: FundName
}

const FundDetails = (props: Props) => {
    const { data } = props
    return(
        <div>
            Name: {data?.name}
            Sub fundid
            {data?.classes ? Object.values(data.classes).map((item: string) => 
                <div id={item} style={{padding: 10, fontWeight: 600}}>
                    {item}
                </div>
                ) : null}
        </div>
    )
}

export default FundDetails