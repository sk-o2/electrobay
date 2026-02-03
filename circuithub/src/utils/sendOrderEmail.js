// import emailjs from "@emailjs/browser";

// export const sendOrderEmail = async ({ user, order }) => {
//   if (!order || !user) return;

//   const orderItemsText = order.items
//     .map(item => `${item.product.name} × ${item.qty}`)
//     .join("\n");

//   const templateParams = {
//     user_name: user.name,
//     user_email: user.email,
//     user_phone: user.phone || "Not provided",
//     user_address: order.address
//       ? `${order.address.line1}, ${order.address.city}, ${order.address.state}, ${order.address.postalCode}, ${order.address.country}`
//       : "Address not provided",
//     order_items: orderItemsText,
//     total_price: order.totalPrice,
//     order_id: order._id,
//     order_date: new Date(order.createdAt).toLocaleString(),
//   };

//   return emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID_ORDER,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER,
//     templateParams,
//     import.meta.env.VITE_EMAILJS_PUBLIC_KEY_ORDER
//   );
// };


// import emailjs from "@emailjs/browser";

// export const sendOrderEmail = async ({ user, order }) => {
//   if (!user || !order) return;

//   const items = order.items || [];

// //   const orderItemsText = items.length
// //     ? items.map(i => `${i.product.name} × ${i.qty}`).join("\n")
// const orderItemsText = order.items
//   .map(
//     (item) =>
//       `${item.name} × ${item.quantity || item.qty} — ₹${item.price}`
//   )
//   .join("\n");

   

//   const templateParams = {
//     user_name: user.name,
//     user_email: user.email,
//     user_phone: user.phone || "Not provided",
//     user_address: order.address
//       ? `${order.address.line1}, ${order.address.city}, ${order.address.state}, ${order.address.postalCode}, ${order.address.country}`
//       : "Address not provided",
//     order_items: orderItemsText,
//     total_price: order.totalPrice,
//     order_id: order._id,
//     order_date: new Date(order.createdAt).toLocaleString(),
//   };

//   return emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID_ORDER,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER,
//     templateParams,
//     import.meta.env.VITE_EMAILJS_PUBLIC_KEY_ORDER,
//   );
// };


import emailjs from "@emailjs/browser";

export const sendOrderEmail = async ({ user, order }) => {
  // ✅ Safety check
  if (!order || !Array.isArray(order.items)) {
    throw new Error("Invalid order data: items missing");
  }

  // ✅ Build product list correctly
  const orderItemsText = order.items
    .map((item, index) => {
      return `${index + 1}. ${item.name} × ${
        item.quantity ?? item.qty ?? 1
      } — ₹${item.price}`;
    })
    .join("\n");

  // ✅ Address formatting (safe)
  const address = order.address || {};
  const formattedAddress = [
    address.line1,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  // ✅ Email template variables
  const templateParams = {
    user_name: user?.name || "Unknown User",
    user_email: user?.email || "Not provided",
    user_phone: user?.phone || "Not provided",
    user_address: formattedAddress || "Address not provided",
    order_items: orderItemsText,
    total_price: order.totalPrice,
    order_id: order._id,
    order_date: new Date(order.createdAt || Date.now()).toLocaleString(),
  };

  // ✅ ENV variables (Vite)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID_ORDER;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_ORDER;

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("EmailJS environment variables missing");
  }

  // ✅ Send email
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  );
};
