import { React } from "react";
import { AddProduct } from "../components/AddProduct";
import { ItemList } from "../components/ListItems";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { SkeletonData } from "../components/SkeletonData";
import { Enerbitlogo2 } from "../shared/assets/images";
import { useAdminInventor } from "../shared/useAdminInventor";
import Modals from "../components/Modal";
import FormAddProduct from "../components/FormAddProduct";
import { CheckGoodStatus } from "../components/CheckGoodStatus";

const InventoryAdministration = () => {
  const {
    items,
    isLoading,
    itemsPerPage,
    totalPages,
    currentPage,
    searchTerm,
    showModal,
    content,
    dataPayload,
    isCreated,
    handleAddItem,
    closeModal,
    handleChangeItemsPerPage,
    handleNextPage,
    OnChangeNashe,
    handlePreviousPage,
    handleSearch,
    AddProductOnClick,
  } = useAdminInventor();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(dataPayload);
  };
  return (
    <div className="card__layout inventory__Administration">
      <div className="container__inventory__administration">
        <div className="header__card__navigate">
          <div>
            <span className="header__text__path">Administracion</span>
            <span className="header__text__path">Inventario</span>
            <div className="header__container__name">
              <span className="header__item__name">
                Administracion de inventario
              </span>
            </div>
          </div>
          <div>
            <Enerbitlogo2 />
          </div>
        </div>
        <div className="filters__card__navigate">
          <div className="container__filters">
            <Search onChange={handleSearch} value={searchTerm} />
            <AddProduct onClick={AddProductOnClick} />
            <Modals
              headerName="Create"
              buttonName="Save"
              state={content}
              showModal={showModal}
              closeModal={closeModal}
            >
              {!isCreated ? (
                <form
                  className="sub__container__modal"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="sub__container__modal">
                    <div className="container__items__serial">
                      <FormAddProduct onChange={OnChangeNashe} />
                    </div>
                    <div className="container__btn">
                      <button type="submit" className="btn__functions save">
                        Guardar
                      </button>
                      <button className="btn__functions delete">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <CheckGoodStatus serial={dataPayload.serial} status="create" />
              )}
            </Modals>
          </div>
        </div>
        <div className="content__card__navigate">
          <div className="container__items">
            {isLoading ? (
              <>
                {items.slice(0, itemsPerPage).map(() => (
                  <SkeletonData />
                ))}
              </>
            ) : (
              <>
                {items.map((item) => (
                  <ItemList data={item} />
                ))}
              </>
            )}
          </div>
          <Pagination
            currentPage={currentPage + 1}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handleChangeItemsPerPage={handleChangeItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryAdministration;
