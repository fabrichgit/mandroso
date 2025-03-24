import React, { useState, useEffect } from "react";
import {
  Warehouse,
  FolderOpen,
  Package2,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { api } from "./api";
import { Entrepot, Place, PlaceContent, ProductStocked } from "./types";

function EntrepotRoot() {
  const [entrepots, setEntrepots] = useState<Entrepot[]>([]);
  const [selectedEntrepot, setSelectedEntrepot] = useState<Entrepot | null>(
    null
  );
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [placeContent, setPlaceContent] = useState<PlaceContent | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Place[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState<"place" | "product" | null>(
    null
  );
  const [newItemData, setNewItemData] = useState({
    name: "",
    productID: "",
    quantity: 0,
    datePeremption: "",
  });

  useEffect(() => {
    loadEntrepots();
  }, []);

  const loadEntrepots = async () => {
    try {
      const response = await api.getEntrepots();
      setEntrepots(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des entrepôts:", error);
    }
  };

  const loadPlaceContent = async (placeId: string) => {
    try {
      const response = await api.getPlaceContent(placeId);
      setPlaceContent(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      // Initialize empty content on error to prevent UI from breaking
      setPlaceContent({ Places: [], Products: [] });
    }
  };

  const handleEntrepotSelect = async (entrepot: Entrepot) => {
    setSelectedEntrepot(entrepot);
    setCurrentPlace(null);
    setBreadcrumbs([]);
    try {
      const response = await api.getPlaces(entrepot.ID);
      if (response.data) {
        setPlaceContent({ Places: response.data, Products: [] });
      } else {
        // Initialize empty content if no data is returned
        setPlaceContent({ Places: [], Products: [] });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des places:", error);
      // Initialize empty content on error to prevent UI from breaking
      setPlaceContent({ Places: [], Products: [] });
    }
  };

  const handlePlaceSelect = async (place: Place) => {
    setCurrentPlace(place);
    await loadPlaceContent(place.ID);
    updateBreadcrumbs(place);
  };

  const updateBreadcrumbs = (place: Place) => {
    const paths = place.Path.split("/").filter((p) => p);
    const newBreadcrumbs: Place[] = [];
    let currentPath = "";

    paths.forEach((path) => {
      currentPath += `/${path}`;
      newBreadcrumbs.push({
        ID: currentPath,
        Name: path,
        EntrepotID: place.EntrepotID,
        ParentID: currentPath === place.Path ? place.ParentID : null,
        Path: currentPath,
      });
    });

    setBreadcrumbs(newBreadcrumbs);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
    setNewItemType(currentPlace ? null : "place");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newItemType === "place") {
        const newPlace = {
          Name: newItemData.name,
          EntrepotID: selectedEntrepot?.ID || "",
          ParentID: currentPlace?.ID || null,
          Path: currentPlace
            ? `${currentPlace.Path}/${newItemData.name}`
            : `/${newItemData.name}`,
        };
        await api.createPlace(newPlace);
        if (currentPlace) {
          await loadPlaceContent(currentPlace.ID);
        } else if (selectedEntrepot) {
          const response = await api.getPlaces(selectedEntrepot.ID);
          setPlaceContent({ Places: response.data || [], Products: [] });
        }
      } else if (newItemType === "product" && currentPlace) {
        const newProduct = {
          ProductID: newItemData.productID,
          PlaceID: currentPlace.ID,
          Quantity: newItemData.quantity,
          DateEntree: new Date().toISOString(),
          DatePeremption: newItemData.datePeremption,
        };
        await api.createProduct(newProduct);
        await loadPlaceContent(currentPlace.ID);
      }
      setShowAddModal(false);
      setNewItemData({
        name: "",
        productID: "",
        quantity: 0,
        datePeremption: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  };

  console.log(breadcrumbs);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Warehouse className="w-6 h-6" />
            Gestionnaire d'Entrepôts
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedEntrepot(null);
                  setCurrentPlace(null);
                  setBreadcrumbs([]);
                }}
              >
                Entrepôts
              </button>
              {selectedEntrepot && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium">{selectedEntrepot.Name}</span>
                </>
              )}
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.Path}>
                  <ChevronRight className="w-4 h-4" />
                  <button
                    className="hover:text-blue-600"
                    onClick={() => handlePlaceSelect(crumb)}
                  >
                    {crumb.Name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {!selectedEntrepot ? (
              // Liste des entrepôts
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entrepots?.map((entrepot) => (
                  <div
                    key={entrepot.ID}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEntrepotSelect(entrepot)}
                  >
                    <div className="flex items-center gap-3">
                      <Warehouse className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{entrepot.Name}</h3>
                        <p className="text-sm text-gray-600">
                          {entrepot.Address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Contenu de l'entrepôt ou d'une place
              <div className="space-y-4">
                {/* Places */}
                {placeContent?.Places?.map((place) => (
                  <div
                    key={place.ID}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 hover:underline" onClick={() => handlePlaceSelect(place)}>
                      <FolderOpen className="w-5 h-5 text-yellow-600" />
                      <span>{place.Name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Produits */}
                {placeContent?.Products?.map((product) => (
                  <div
                    key={product.ID}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Package2 className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="font-medium">
                          Produit {product.ProductID}
                        </span>
                        <div className="text-sm text-gray-600">
                          Quantité: {product.Quantity} | Péremption:{" "}
                          {new Date(
                            product.DatePeremption
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* @ts-ignore */}
                {placeContent?.places?.map((place) => (
                  <div
                    key={place.ID}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePlaceSelect(place)}
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-yellow-600" />
                      <span>{place.Name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Produits */}
                {/* @ts-ignore */}
                {placeContent?.products?.map((product) => (
                  <div
                    key={product.ID}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Package2 className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="font-medium">
                          Produit {product.ProductID}
                        </span>
                        <div className="text-sm text-gray-600">
                          Quantité: {product.Quantity} | Péremption:{" "}
                          {new Date(
                            product.DatePeremption
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Bouton d'ajout */}
                <button
                  onClick={handleAddClick}
                  className="w-full p-3 border-2 border-dashed rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter un élément</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {!currentPlace ? "Ajouter une place" : "Ajouter un élément"}
            </h2>

            {currentPlace && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'élément
                </label>
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      newItemType === "place"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setNewItemType("place")}
                  >
                    Place
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      newItemType === "product"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setNewItemType("product")}
                  >
                    Produit
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleAddSubmit}>
              {(!currentPlace || newItemType === "place") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la place
                  </label>
                  <input
                    type="text"
                    value={newItemData.name}
                    onChange={(e) =>
                      setNewItemData({ ...newItemData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              )}

              {newItemType === "product" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID du produit
                    </label>
                    <input
                      type="text"
                      value={newItemData.productID}
                      onChange={(e) =>
                        setNewItemData({
                          ...newItemData,
                          productID: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité
                    </label>
                    <input
                      type="number"
                      value={newItemData.quantity}
                      onChange={(e) =>
                        setNewItemData({
                          ...newItemData,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                      min="0"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de péremption
                    </label>
                    <input
                      type="date"
                      value={newItemData.datePeremption}
                      onChange={(e) =>
                        setNewItemData({
                          ...newItemData,
                          datePeremption: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntrepotRoot;
