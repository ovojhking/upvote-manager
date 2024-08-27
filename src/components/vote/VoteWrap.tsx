import { useEffect, useState, useRef } from "react";
import { Button } from 'antd';
import { PlusOutlined, UndoOutlined } from '@ant-design/icons';
import {voteItem} from "@/components/vote/VoteInterface";

import VoteContent from "@/components/vote/VoteContent";

const defaultVoteItem: voteItem = {
    status: false
}

function VoteWrap() {
    const [voteList, setVoteList] = useState<voteItem[][]>([]);
    const isMounted = useRef(false);

    const initVoteList = ()=>{
        const getLatestVoteList = localStorage.getItem('voteList');

        if(!getLatestVoteList){
            resetVoteList();
        }else{
            setVoteList([...JSON.parse(getLatestVoteList)]);
        }
    }

    const resetVoteList = ()=>{
        localStorage.removeItem('voteList');
        setVoteList(                
            [
                [{...defaultVoteItem}]
            ]
        );
    }

    const updateVoteList = (index: number, item: any)=>{
        if(index>voteList.length-1) return;
        voteList[index] = item;
        setVoteList([...voteList]);
    }


    useEffect(()=>{
        initVoteList();
    }, [])

    useEffect(()=>{
        if(!isMounted.current){
            isMounted.current = true;
            return;
        }
        
        localStorage.setItem('voteList', JSON.stringify(voteList));
    }, [voteList])

    return (
        <>
            <div className="flex justify-end items-center my-[10px]">
                <Button
                    type="default"
                    icon={<UndoOutlined />}
                    onClick={resetVoteList}
                    className="mx-[10px]"
                >
                    Reset
                </Button>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setVoteList([...voteList, [{...defaultVoteItem}]])}
                    >
                    Create Vote
                </Button>
            </div>
            <div className="px-[15px] py-[5px] rounded-[5px] border-[1px] border-solid">
                {
                    voteList.map((vote: voteItem[], index: number)=> <VoteContent key={index} data={vote} index={index} update={updateVoteList}/>)
                }
            </div>
        </>
    );
}

export default VoteWrap;