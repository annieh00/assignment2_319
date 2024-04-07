import React, { useState, useEffect } from "react";
import items from "./products.json";
import { useForm } from "react-hook-form";
import { Categories } from "./Categories";

const Shop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState("shopping"); // Set initial viewer state to "shopping"

function Shopping() {
  const [query, setQuery] = useState('');
  const [itemsCategory, setItemsCategory] = useState(items);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  function handleClick(tag) {
    console.log("Step 4 : in handleClick", tag);
    let filtered = items.filter(cat => cat.category === tag);
    // modify useState
    setItemsCategory(filtered);
    // ProductsCategory = filtered;
    // console.log("Step 5 : ", Products.length, ProductsCategory.length);
    } // end handleClick

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img className="img-fluid" src={el.image} width={150} alt={el.title} />
      {el.title}${el.price}
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    const filtered = items.filter(item => {
      if (e.target.value === "") return true;
      return item.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setItemsCategory(filtered);
  };

  const listItems = itemsCategory.map((el) => ( // Update here: Use itemsCategory instead of items
    // PRODUCT
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} alt={el.title} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.title}</div>
          <div className="row">{el.category}</div>
        </div>
        <div className="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button
            type="button"
            variant="light"
            onClick={() => addToCart(el)}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="py-10">
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          type="search" value={query} onChange={handleChange} placeholder="Search here..."
        />
      </div>
      <div className="card">
        <div className="row justify-content-center">
          {/* Centered SHOPPING CART */}
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col text-center">
                  <h4>
                    <b>Organs Store</b>
                  </h4>
                  <div className="py-10">
            { (Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold 
              text-gray-700 mr-2 mt-2" onClick={()=>{handleClick(tag)}} >{tag}</button>)
            }
          </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center text-muted">
                  Products selected {cart.length}
                </div>
              </div>
              <div className="row">
                <div className="col text-center text-muted">
                  Order total: ${cartTotal}
                </div>
              </div>
            </div>
            <div>{listItems}</div>
            <button onClick={() => setViewer("payment")} className="btn btn-primary">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  function Payment() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      setDataF(data);
      setViewer("summary");
    };

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          {" "}
          <div className="form-group">
            <input
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-control"
            />
            {errors.fullName && (
              <p className="text-danger">Full Name is required.</p>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              placeholder="Email"
              className="form-control"
            />
            {errors.email && (
              <p className="text-danger">Email is required.</p>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("creditCard", { required: true })}
              placeholder="Credit Card"
              className="form-control"
            />
            {errors.creditCard && (
              <p className="text-danger">Credit Card is required.</p>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="form-control"
            />
            {errors.address && (
              <p className="text-danger">Address is required.</p>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("address2")}
              placeholder="Address 2"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              {...register("city", { required: true })}
              placeholder="City"
              className="form-control"
            />
            {errors.city && <p className="text-danger">City is required.</p>}
          </div>

          <div className="form-group">
            <input
              {...register("state", { required: true })}
              placeholder="State"
              className="form-control"
            />
            {errors.state && (
              <p className="text-danger">State is required.</p>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("zip", { required: true })}
              placeholder="Zip"
              className="form-control"
            />
            {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      
    );
  }

  function Summary() {
    return (
      <div>
        <h1>Payment summary:</h1>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>{dataF.creditCard}</p>
        <p>{dataF.address}</p>
        <p>{dataF.address2}</p>
        <p>
          {dataF.city},{dataF.state} {dataF.zip}{" "}
        </p>
      </div>
    );
  }

  return (
    <div>
      {viewer === "shopping" && <Shopping />}
      {viewer === "payment" && <Payment />}
      {viewer === "summary" && <Summary />}
    </div>
  );
};

export default Shop;