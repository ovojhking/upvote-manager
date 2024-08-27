import VoteWrap from '../../components/vote/VoteWrap';

function Home() {

    return (
        <div className='max-w-[768px] m-auto'>
            <div className="mx-[15px] my-[15px]">
                <h1>Vote</h1>
                <VoteWrap />
            </div>
        </div>
    );
}

export default Home;