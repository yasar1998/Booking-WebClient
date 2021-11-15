import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Card, Avatar, Badge} from 'antd';
import moment from 'moment';
import { getAccountBalance, currencyFormatter, payoutSetting } from '../actions/stripe';
import {MoneyCollectOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';


const {Meta} = Card;
const {Ribbon} = Badge;

const ConnectNav = () => {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const {auth} = useSelector((state) => ({...state})); 
    const {user, token} = auth;

    useEffect(()=>{
        getAccountBalance(auth.token).then((res)=>{
            // console.log(res);
            setBalance(res.data);
        });
    },[])

    const handlePayoutSettings = async () => {
        setLoading(true);
        try{
            const res = await payoutSetting(token);
            console.log('RES FOR PAYOUT SETTING LINK', res);
            window.location.href = res.data.url;
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
            toast('Unable to access settings. Try again')
        }
    } 

    return (
        <div className="d-flex justify-content-around">
            <Card className="rounded-circle">
                <Meta avatar={<Avatar>{user.name[0]}</Avatar>} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`} />
            </Card>
            {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
                <>
                    <Ribbon text="Balance" color="red">
                        <Card className="bg-light pt-1">
                            {balance && balance.pending && balance.pending.map((bp, i)=>(
                                <span key={i} className="lead">
                                   {currencyFormatter(bp)}
                                </span>
                            ))}
                        </Card>
                    </Ribbon>
                    <Ribbon text="Payouts" color="red">
                        <Card onClick={handlePayoutSettings} className="bg-light pointer">
                            <MoneyCollectOutlined className="h5 pt-2" />
                        </Card>
                    </Ribbon>
                </>
            )}
        </div>
    )
}

export default ConnectNav;
