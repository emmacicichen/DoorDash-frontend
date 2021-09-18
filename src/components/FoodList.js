import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";//引入antd中的icon里的加号

const { Option } = Select;

//菜单每一个小card右上角的"+"，点击之后把当前选中的menu加到购物车里
const AddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);

    //add selected menu to the cart, call addItemToCart API
    const AddToCart = () => {
        //step1: set loading to true
        //step2: add menu to cart and inform the server
        setLoading(true);
        addItemToCart(itemId)//把itemId当作param传进去
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

//引入了button和tooltip from antd，做到把鼠标放在"+"上面，就会显示这个"+"是干什么的
    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"//变成蓝色
                icon={<PlusOutlined />}//显示一个"+"，实现一个icon button
                onClick={AddToCart}//点击他，要做什么-》点击他，把它add to cart
            />
        </Tooltip>
    );
};

const FoodList = () => {


    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [loadingRest, setLoadingRest] = useState(false); //loading restaurant
    const [loading, setLoading] = useState(false); //loading menu from selected restaurrant
    const [foodData, setFoodData] = useState([]); //选中餐馆，load了menu之后，setState后要把food的data也拿到

    //1. Fetch restaurant list
    //什么时候显示menu？一上来就要，因此要使用componentDidMount来做，因为compo一上树就运行，
    //在func compo中，我们用useEffect
    //useEffect啥时候调用，放到[]，我只用一次，【】空着
    useEffect(() => {
        //step1: set loading restaurant true
        //step2: fetch restaurant list from the server
        setLoadingRest(true);
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoadingRest(false);
            });
    }, []);

    //2. fetch menu of current selected restaurant
    useEffect(() => {
        //step1: set loadign menu status
        //step2: fetch menu from the server
        if (curRest) {
            setLoading(true);
            getMenus(curRest)
                .then((data) => { //拿到结果
                    setFoodData(data);//让foodData拿到你的数据
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest]);

    return (
        //<> 不生成一个div
        //State
        //1. current selected option, through value! value={curRest}
        //2. loading status
        // const[loadingRest, setLoadingRest]

        <>
            <Select
                //对于每一个主见：1。 UI的长相 2。data （怎么获取，怎么变化） here：data is 当前选项
                //创建select框框
                //使得每次选择都能记录修改的状态
                value={curRest}
                onSelect={(value) => setCurRest(value)} //选项变化的时候，onSelect被调用，修改当前restaurrant
                placeholder="Select a restaurant"
                loading={loadingRest}
                style={{ width: 300 }}
                onChange={() => {}} //当onChange调用时候什么都不做
            >
                {//遍历所有的restaurants，把他们都显示到下拉菜单
                    restaurants.map((item) => {//因为父主见是《select》，因此《option》要传入一个key （id）
                    return <Option value={item.id} key={item.id}>{item.name}</Option>;
                })}
            </Select>

            {//显示菜单list，从antd中引入List
                //只有当curRest为真的时候才能显示list，因此用&&
                curRest && (
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,//xs: 0 -100px，每行只显示一张图
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.name}
                                //card右上角的button，加入购物车
                                //要加哪一个item，你要传一个item.id
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name} //if image is not found
                                    style={{ height: 'auto', width: "100%", display: "block" }}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default FoodList;

