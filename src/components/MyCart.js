import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;//从Typography中引入，然后解构Text

const MyCart = () => {
   // What does useState return? It returns a pair of values: the current state and a function that updates it.
    // This is why we write const [count, setCount] = useState().
    const [cartVisible, setCartVisible] = useState(false);//display/hide Drawer
    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);//set drawer loading
    const [checking, setChecking] = useState(false);//set checkout loading

    //当cart visible的时候，去获取数据
    //hooks, 相当于didMount和didUpdate的合体
    useEffect(() => {
        //step1: see loading to true
        //step2: fetch items added in the cart from the server
        if (!cartVisible) {//if cart is visible, 我才最这些事情
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    //checkout的时候做啥，传给checkout的button
    //inform the server to checkout
    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);//关闭drawer
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    return (//Cart的button图样从antd里面拿 ，弹出的框是antd里的<Drawer
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                //title + list + checkout
                //1. title: my shopping cart
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible} //visible来控制啥时候能看到Drawer
                width={520}
                //2. footer: Drawer下面的footer
                //footer里有价格和两个button
                //价格用Text来做的
                footer={
                    <div
                        style={{
                            display: "flex", //flex box决定price和checkout他们是左右排布的
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || cartData?.orderItemList.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    // 对于List 1。 data source什么时候获取 ：点击"cart"button，弹出drawer的时候，才会到后端获取数据
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData? cartData.orderItemList : []}
                    renderItem={(item) => (//renderItem 这个api，跟一个render的函数，对于每一个item 应该怎么render
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`} //$price
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};

export default MyCart;

