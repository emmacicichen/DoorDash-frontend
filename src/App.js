
import { Layout, Typography } from "antd";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import FoodList from "./components/FoodList"
import MyCart from "./components/MyCart";



const { Header, Content } = Layout;// destructure the layout from antdesign
const { Title } = Typography;

function App() {
    //define login status
    //在函数主见中，用useState来修改状态
    const [authed, setAuthed] = useState(false);

    return (
        //给layout加一个style使得header横着占满
        <Layout style={{ height: "100vh" }}>
            <Header>
                <div className="header"
                     style={{display: "flex", justifyContent: "space-between"}}>
                    <Title
                        level={2}
                        style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
                    >
                        FoodNow
                    </Title>
                    {authed && (
                        <div>
                            <MyCart />
                        </div>
                    )}

                </div>
            </Header>
            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",//64px是header的高度，content的高度就是整个页面100%减去header的高度（64px）
                    overflowY: "auto",
                }}>
                {//有条件的render：通过条件变化 决定显示内容的不同
                    authed
                        ?
                        (<FoodList />)
                        :
                        (<LoginForm onSuccess={() => setAuthed(true)} />
                    //把child compo（LoginForm）的登录信息传给父（App），在父亲这里定义一个函数
                    //在父亲里记录登陆状态，但是登录状态是在子组件中发生的： 子 -> 父的数据传递， 三部曲
                )}
            </Content>
        </Layout>
    );
}

export default App;



