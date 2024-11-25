import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { OrderSheet } from '../models/order.model';
import { useAlert } from '../hooks/useAlert';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { showAlert, showConfirm } = useAlert();
    // spa에서 화면 이동
    const navigate = useNavigate();

    const { carts, deleteCartItem, isEmpty } = useCart();
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        // 언체크
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            // 체크
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleItemDelete = (id: number) => {
        // 삭제
        deleteCartItem(id);
    };

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.price * cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert('주문할 상품을 선택해 주세요.');
            return;
        }

        // 주문서 작성으로 데이터 전달하기 (delivery 정보 빼기)
        const orderData: Omit<OrderSheet, 'delivery'> = {
            items: checkedItems,
            totalPrice,
            totalQuantity,
            firstBookTitle: carts[0].title,
        };

        showConfirm('주문하시겠습니까?', () => {
            navigate('/order', { state: orderData }); // orderDate 넘겨주기
        });

        // console.log(orderData);
    };

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                {!isEmpty && (
                    <>
                        <div className="content">
                            {carts.map((item) => (
                                <CartItem
                                    key={item.id}
                                    cart={item}
                                    checkedItems={checkedItems}
                                    onCheck={handleCheckItem}
                                    onDelete={handleItemDelete}
                                />
                            ))}
                        </div>
                        <div className="summary">
                            <CartSummary
                                totalQuantity={totalQuantity}
                                totalPrice={totalPrice}
                            />
                            <Button
                                size="large"
                                scheme="primary"
                                onClick={handleOrder}
                            >
                                주문하기
                            </Button>
                        </div>
                    </>
                )}
                {isEmpty && (
                    <Empty
                        icon={<FaShoppingCart />}
                        title="장바구니가 비었습니다"
                        description={<>장바구니를 채워보세요.</>}
                    />
                )}
            </CartStyle>
        </>
    );
};

export const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 24px 0 0 0;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .order-info {
        h1 {
            padding: 0 0 24px 0;
        }

        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: 1px solid ${({ theme }) => theme.borderRadius.default};
        padding: 12px;
    }

    .delivery {
        fieldset {
            border: 0;
            margin: 0;
            padding: 0 0 12px 0%;
            display: flex;
            justify-content: start;
            gap: 8px;

            label {
                width: 80px;
            }

            .input {
                flex: 1;
                input {
                    width: 100%;
                }
            }
        }

        .error-text {
            color: red;
            margin: 0;
            padding: 0 0 12px 0;
            text-align: right;
        }
    }
`;

export default Cart;