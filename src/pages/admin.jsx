import { useEffect, useState } from "react";
import { axiosInstance } from "../axios";
import { imgBaseURL, dummyImg } from "../staticData";

export default function Admin() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");

      console.log("fetchProducts res", res);

      console.log("res", res);
      setProducts(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/admin/orders");
      setOrders(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchOrders()]);
      setLoading(false);
    };
    load();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axiosInstance.put(`/admin/orders/${orderId}/status`, {
        status,
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data.data : o)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="admin-loading">Loading admin panel...</p>;

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button
          className={tab === "products" ? "admin-tab active" : "admin-tab"}
          onClick={() => setTab("products")}
        >
          Products ({products.length})
        </button>
        <button
          className={tab === "orders" ? "admin-tab active" : "admin-tab"}
          onClick={() => setTab("orders")}
        >
          Orders ({orders.length})
        </button>
      </div>

      {tab === "products" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      className="admin-thumb"
                      src={p?.image ? `${imgBaseURL}${p.image}` : dummyImg}
                      alt={p.name}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "orders" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(-6)}</td>
                  <td>{o.user?.name || o.user?.email || "—"}</td>
                  <td>{o.products.length} item(s)</td>
                  <td>₹{o.totalAmount}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className="admin-status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
