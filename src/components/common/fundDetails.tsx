import { ClassType, FundName } from 'apiTypes'
import React from 'react'

interface Props {
  data?: FundName
  onClassSelect?(id: string): void
}

const FundDetails = (props: Props) => {
  const { data, onClassSelect } = props
  console.log(data)

  return (
    <div>
      Name: {data?.name}
    </div>
  )
}

export default FundDetails
