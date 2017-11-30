import React from 'react'
import { TabBar } from 'antd-mobile';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {DashBoardWrapper} from '../styles/dashboard/dashboard'
import {getInfo} from '../actions/user'

function Deliver() {
    return (
        <div>deliver</div>
    )
}
function Goods() {
    return (
        <div>Goods</div>
    )
}
function Message() {
    return (
        <div>Message</div>
    )
}
function Me() {
    return (
        <div>Me</div>
    )
}

const list = [
    {
        title: '订单',
        path: '/order',
        type: 'customer',
        component: Deliver
    },
    {
        title: '商品',
        path: '/goods',
        type: 'deliver',
        component: Goods
    },
    {
        title: '消息',
        path: '/message',
        component: Message
    },
    {
        title: '我的',
        path: '/me',
        component: Me
    }
]

@connect(
    state => state.user,
    {getInfo}
)
class DashBoard extends React.Component {
    componentDidMount() {
        const {history, type} = this.props
        if (window.localStorage.getItem('token')) {
            if (!type) {
                this.props.getInfo()
            }
        } else {
            history.push('/login')
        }
    }
    render() {
        const {type, location, history, path} = this.props
        if (!type) {
            return null
        }
        return  (
            <div>
                {path && location.pathname === '/' ? <Redirect to={path} /> : null}
                <Switch>
                    {list.map(v => (
                        <Route key={v.path} path={v.path} component={Me}/>
                    ))}
                </Switch>
                <DashBoardWrapper>
                    <TabBar>
                        {list
                            .filter(v => v.type !== type)
                            .map(v => (
                            <TabBar.Item
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                                />}
                                // selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                                title={v.title}
                                key={v.title}
                                selected={location === v.path}
                                onPress={() => {
                                    history.push(v.path)
                                }}
                            />
                        ))}
                    </TabBar>
                </DashBoardWrapper>
            </div>
        )
    }
}

export default DashBoard