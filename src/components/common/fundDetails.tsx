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
            {data?.classes ? Object.values(data.classes).map((item: ClassType) => 
                <div key={item.id} style={{padding: 10, fontWeight: 600}} onClick={() => {
                    if (onClassSelect) {
                        onClassSelect(data.id +"-"+item.id)
                    }
                }}>
                    {item.name}
                </div>
                ) : null}
        </div>
    )
}

export default FundDetails