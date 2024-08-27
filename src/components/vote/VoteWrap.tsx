import { useEffect, useState, useRef } from "react";
import { Button, Switch } from 'antd';
import { PlusOutlined, UndoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {voteItem} from "@/components/vote/VoteInterface";

import VoteContent from "@/components/vote/VoteContent";

const defaultVoteItem: voteItem = {
    status: false
}

const defaultStateConsistency = ()=>{
    const stateConsistency = localStorage.getItem('stateConsistency');
    if(stateConsistency === null || stateConsistency === undefined){
        return true;
    }
    return stateConsistency === 'true';
}

function VoteWrap() {
    const [voteList, setVoteList] = useState<voteItem[][]>([]);
    const [stateConsistency, setStateConsistency] = useState<boolean>(defaultStateConsistency());
    const isVoteListUpdate = useRef(false);
    const isStateConsistencyUpdate = useRef(false);

    const initVoteList = ()=>{
        const getLatestVoteList = localStorage.getItem('voteList');

        if(!getLatestVoteList){
            resetVoteList();
        }else{
            setVoteList([...JSON.parse(getLatestVoteList)]);
        }
    }

    const resetAll = ()=>{
        resetStateConsistency();
        resetVoteList();
    }

    const resetStateConsistency = ()=>{
        localStorage.removeItem('stateConsistency');
        setStateConsistency(true);
    }

    const resetVoteList = ()=>{
        localStorage.removeItem('voteList');
        setVoteList(                
            [
                [{...defaultVoteItem}]
            ]
        );
    }

    const updateVoteList = (index: number, item: voteItem[])=>{
        if(index>voteList.length-1) return;
        voteList[index] = item;
        setVoteList([...voteList]);
    }


    useEffect(()=>{
        initVoteList();
    }, [])

    useEffect(()=>{
        if(!isVoteListUpdate.current){
            isVoteListUpdate.current = true;
            return;        
        }
        localStorage.setItem('voteList', JSON.stringify(voteList));
    }, [voteList])

    useEffect(()=>{
        if(!isStateConsistencyUpdate.current){
            isStateConsistencyUpdate.current = true;
            return;
        }
        localStorage.setItem('stateConsistency', JSON.stringify(stateConsistency));
        resetVoteList();

    }, [stateConsistency]);

    return (
        <>
            <div className="flex justify-between items-center my-[10px]">
                <div className="flex items-center">
                    <span className="text-[12px] mr-[5px]">State Consistency</span>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={stateConsistency}
                        onChange={(checked)=>{setStateConsistency(checked)}}
                    />
                </div>

                <div>
                    <Button
                        type="default"
                        icon={<UndoOutlined />}
                        onClick={resetAll}
                        className="mx-[10px]"
                        size={'small'}
                    >
                        Reset
                    </Button>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setVoteList([...voteList, [{...defaultVoteItem}]])}
                        size={'small'}
                        >
                        Create Vote
                    </Button>
                </div>
            </div>
            <div className="px-[15px] py-[5px] rounded-[5px] border-[1px] border-solid">
                {
                    voteList.map((vote: voteItem[], index: number)=> <VoteContent key={index} data={vote} index={index} update={updateVoteList} stateConsistency={stateConsistency}/>)
                }
            </div>
        </>
    );
}

export default VoteWrap;