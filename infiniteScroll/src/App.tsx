// เรียกใช้งาน useState, useEffect จาก React Hooks
import { useState, useEffect } from 'react';
import SampleDataCard from './SampleDataCard.tsx';
import './App.css'

interface sampleData {
  id: number;
  description: string;
  url: string;
  types: string[];
  topics: string[];
  levels: string[];
}

const App = () => {
  const [data, setData] = useState<sampleData[]>([]);
  // สร้าง state ชื่อว่า data และกำหนดค่าเริ่มต้นเป็น array ว่าง
  const [page, setPage] = useState(1);  // สร้าง state ชื่อว่า page และกำหนดค่าเริ่มต้นเป็น 1 เพื่อใช้เป็นค่าเริ่มต้นในการเรียก API

  useEffect(() => {
    fetchData();
  }, [page]);  // ใช้ useEffect เพื่อเรียกใช้ฟังก์ชัน fetchData เมื่อ page มีการเปลี่ยนแปลง โดยใช้ page เป็น dependency array

  const fetchData = () => {
    fetch(`https://api.sampleapis.com/codingresources/codingResources/${page}`)
      .then(response => response.json())
      .then(newData => { // ใช้ newData เพื่อเก็บข้อมูลที่ได้จากการเรียก API มาในแต่ละครั้ง
        setData(prevData => [...prevData, newData]); // นำข้อมูลใน newData มาต่อท้ายข้อมูลเดิมใน prevData
        setPage(prevPage => prevPage + 1); // เพิ่มค่า page ไปเรื่อยๆ เพื่อใช้เป็นค่าในการเรียก API ในครั้งถัดไป
      })
      .catch(error => console.error(error));
  };

  // ใช้ useEffect เพื่อตรวจสอบว่ามีการ scroll มากกว่าหรือเท่ากับขนาดของหน้าจอหรือไม่ ถ้าใช่ให้เรียกฟังก์ชัน fetchData
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight // ตรวจสอบว่ามีการ scroll มากกว่าหรือเท่ากับขนาดของหน้าจอหรือไม่
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll); // เพิ่ม event listener ให้กับ window เพื่อตรวจสอบการ scroll

    return () => {
      window.removeEventListener('scroll', handleScroll); // ลบ event listener ทิ้งเมื่อ component unmount
    };
  }, []);

  return (
    <div className="samepleDataList">
      {data.map((item, index) => {
        return (
          <SampleDataCard
            key={index}
            description={item.description}
            url={item.url}
            types={item.types}
            topics={item.topics}
            levels={item.levels}
          />
        )
      })}
    </div>
  );
};

export default App;