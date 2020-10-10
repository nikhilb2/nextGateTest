import { ClassType, FundName } from 'apiTypes'
import React from 'react'


interface Props {
    data?: FundName
    onClassSelect?(id: string): void
}

const FundDetails = (props: Props) => {
    const { data, onClassSelect } = props
    console.log(data);
    
    return(
        <div>
            Name: {data?.name}
            {data?.subfunds ? Object.values(data.subfunds).map((item: string, i: number) => 
                <div key={item} style={{padding: 10, fontWeight: 600}} onClick={() => {
                    if (onClassSelect) {
                        onClassSelect(data.id +"-"+item)
                    }
                }}>
                    {item}
                </div>
                ) : null}
        </div>
    )
}

export default FundDetails