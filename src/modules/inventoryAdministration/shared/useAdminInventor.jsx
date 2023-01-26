import { React, useEffect, useState } from "react";
import axios from "axios";

export const useAdminInventor = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [content, setContent] = useState("Preview");
  const [showModal, setShowModal] = useState(false);

  const client = axios.create({
    baseURL: "https://ops.enerbit.dev/learning/api/v1/meters",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await client.get(
          `?page=${currentPage}&size=${itemsPerPage}${
            searchTerm ? `&serial=${searchTerm}` : ""
          }`
        );
        setItems(response.data.items);
        setInitialData(response.data.items);
        setTotalPages(response.data.pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setItems(
        initialData.filter((item) =>
          item.serial.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setItems(initialData);
    }
  }, [searchTerm, initialData]);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await client.delete(`/${id}`);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const addItem = async (item) => {
    const itemPost = { title: "test", description: "test" };
    await client.post(``, itemPost);
    setItemPost([...itemPost, itemPost]);
  };

  function handleChangeItemsPerPage(newItemsPerPage) {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(Math.floor((currentPage * itemsPerPage) / newItemsPerPage));
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1);
  }

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchTerm("");
      setItems(initialData);
    } else {
      setSearchTerm(e.target.value);
    }
  };
  const statusOnClick = () => {
    setShowModal(true);
    console.log(content);
  };
  const viewOnClick = () => {
    setContent("Preview");
    console.log(content);
  };
  const editOnClick = () => {
    setContent("Edit");
    console.log(content);
  };
  const deleteOnClick = () => {
    setContent("Delete");
    console.log(content);
  };
  const AddProductOnClick = () => {
    setContent("Add Product");
    setShowModal(true);
    console.log(content);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return {
    items,
    isLoading,
    itemsPerPage,
    searchValue,
    totalPages,
    currentPage,
    searchTerm,
    isDeleting,
    content,
    showModal,
    error,
    statusOnClick,
    handleDelete,
    handleChangeItemsPerPage,
    handleNextPage,
    handlePreviousPage,
    handleSearch,
    viewOnClick,
    editOnClick,
    deleteOnClick,
    AddProductOnClick,
    closeModal,
  };
};