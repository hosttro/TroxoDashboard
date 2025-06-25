
export   const getAllCustomers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is requierd");
      return;
    }
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Customers/GetAll/?storeId=${localStorage.getItem("storeId")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };