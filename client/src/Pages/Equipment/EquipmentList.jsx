import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EquipmentTable from "../../Components/EquipmentTable/EquipmentTable";


const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchEquipment = async () => {
    const res = await fetch(`/api/equipment`);
    return res.json();
  };

  useEffect(() => {
    fetchEquipment()
      .then((items) => {
        setLoading(false);
        setEquipment(items);
      })
  }, [updating, isDeleted]);

  if (loading) {
    return <Loading />;
  };

  return <EquipmentTable
    equipment={equipment}
    updating={updating}
    setUpdating={setUpdating}
    setIsDeleted={setIsDeleted} />;
};

export default EquipmentList;
