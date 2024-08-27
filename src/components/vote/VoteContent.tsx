import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {voteItem} from "@/components/vote/VoteInterface";

import VoteIcon from "@/components/vote/VoteIcon";

function VoteContent(props: {data: voteItem[], index: number, update: any, stateConsistency: boolean}) {
    const {data, index, update, stateConsistency} = props;

    const handleAdd = (index: number)=>{
        let status = false;
        if(stateConsistency){
            status = data[0].status;
        }
        update(index, [...data, {status}]);
    }

    const handleChange = (subIndex: number)=>{
        if(stateConsistency){
            let status = !data[subIndex].status;
            data.forEach((item: voteItem)=>{
                item.status = status;
            })
        }else{
            data[subIndex].status = !data[subIndex].status;
        }
        update(index, [...data]);
    }

    return (
        <div className="flex justify-between items-center" id="a">
            <div className="flex flex-wrap px-[5px] py-[5px] my-[10px] border-[1px] border-solid rounded-[5px] flex-1" id="b">
                {
                    data.map((vote: voteItem, subIndex: number)=> 
                        <VoteIcon 
                            key={subIndex}
                            subIndex={subIndex}
                            data={vote}
                            handleClick={handleChange}
                        />
                    )
                }
            </div>
            <div className='pl-[10px]'>
                <Button type="primary" icon={<PlusOutlined />} size={'small'} onClick={() => handleAdd(index)} id="c"/>
            </div>
        </div>
    );
}

export default VoteContent;