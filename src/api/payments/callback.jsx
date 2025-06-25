// مثال: /pages/payment/callback.jsx
useEffect(() => {
  const { trackId, status } = router.query;
  verifyPayment(trackId, status).then(() => {
    // ناجح → حدث رصيد المحفظة
    router.replace("/wallet");
  });
}, []);
