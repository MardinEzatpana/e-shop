import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "../../redux/slices/cartSlice";

const Cart = ({ openModal, setOpen, handleOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();
  return (
    <div>
      {cart.length > 0 ? (
        <Fragment>
          <Dialog
            size="xl"
            className="border-0 outline-0"
            open={openModal}
            handler={() => setOpen(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader className="justify-between">
              <Typography variant="h5" color="blue-gray">
                Shopping Bag
              </Typography>
              <IconButton
                color="blue-gray"
                size="sm"
                variant="text"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </DialogHeader>

            <DialogBody
              divider
              className="overflow-y-scroll h-[65vh] flex flex-col justify-between items-center"
            >
              {cart.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-10">
                      <div>
                        <img
                          className="h-[125px] rounded-md"
                          src={item.img}
                          alt={item.name}
                        ></img>
                        <div className="flex flex-col items-start">
                          <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                            {item.name}
                          </h4>
                        </div>
                        <div className="max-w-xs">
                          <p className="text-black text-xs font-inter tracking-normal leading-none pt-2">
                            {item.text}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                          Selected size:{" "}
                          <span className="ml-2">{item.size}</span>
                        </p>
                        <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                          Selected color:{" "}
                          <span
                            className="ml-2 rounded-full px-2"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </p>
                        <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                          Amount: <span className="ml-2">{item.amount}</span>
                        </p>
                        <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                          Single Item Price:{" "}
                          <span className="ml-2">{item.price}$</span>
                        </p>
                        <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                          Total Item Prices:{" "}
                          <span className="ml-2">{item.totalPrice}$</span>
                        </p>
                        <div className="pt-4">
                          <Tooltip
                            content="Remove from the Cart"
                            placement="bottom"
                          >
                            <Button
                              onClick={() => dispatch(removeFromCart(item))}
                              size="sm"
                              color="red"
                              ripple={true}
                              variant="filled"
                            >
                              Remove
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => dispatch(resetCart())}
                className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
                Reset cart
              </button>
            </DialogBody>
            <DialogFooter className="flex justify-start items-center">
              <p className="text-black text-base font-inter tracking-normal leading-none pt-2">
                Total Price of All Products:{" "}
                <span className="ml-2">{totalPrice}$</span>
              </p>
            </DialogFooter>
          </Dialog>
        </Fragment>
      ) : (
        <Fragment>
          <Dialog
            className="border-0 outline-0"
            open={openModal}
            handler={() => setOpen(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader className="justify-between">
              <Typography variant="h5" color="blue-gray">
                Shopping Bag
              </Typography>
              <IconButton
                color="blue-gray"
                size="sm"
                variant="text"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </DialogHeader>
            <DialogBody divider>
              <div>
                <h1 className="text-black text-3xl font-inter font-bold tracking-normal leading-none py-4">
                  Your bag is empty
                </h1>
                <p className="text-black text-base font-inter tracking-normal leading-none ">
                  Add some products
                </p>
              </div>
            </DialogBody>
          </Dialog>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
