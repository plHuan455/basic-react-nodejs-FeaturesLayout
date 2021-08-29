import React, {useEffect, useState} from "react";
import {
	forceDeleteProducts,
	restoreProducts,
} from "features/Product/productSlice";

import AdminTable from "features/Admin/components/AdminTable";
import {numberToCost} from "assets/cores/cores";
import {useSelector} from "react-redux";

ProductTrash.propTypes = {};

function ProductTrash(props) {
	const productInfo = useSelector(state => state.products.admin.trash);

	const productTrashHeaders = [
		"Stt",
		"Name",
		"Type",
		"Cost",
		"Description",
		"image",
		"Shape Image",
		"Color Image",
		"Shape",
		"Color",
		"City",
		"CreatedAt",
		"UpdatedAt",
		"Options",
	];

	const productIdList = productInfo.data.map(product => product._id);

	// id of products will been deleted
	const handleDelete = data => {
		return forceDeleteProducts({data});
	};
	const handleRestore = data => {
		return restoreProducts({data});
	};
	// RENDER
	return (
		<AdminTable
			header={{
				title: "Product trash",
				content: "Danh sách các sản phẩm đã bị xoá",
			}}
			idList={productIdList}
			tableHeaders={productTrashHeaders}
			adminHandleDelete={handleDelete}
			adminHandleRestore={handleRestore}
			pageType="trash"
		>
			{productInfo.data.map((product, index) => (
				<tr dataId={product._id} key={product._id}>
					<td> {index + 1} </td>
					<td> {product.name} </td>
					<td> {product.type} </td>
					<td className="cost-style">{numberToCost(product.cost)}</td>
					<td> {product.description}</td>
					<td></td>
					<td></td>
					<td></td>
					<td>
						{product.shapes.map((shape, index) => {
							if (index === product.shapeslenght + 1) return shape.name;
							return shape.name + ", ";
						})}
					</td>
					<td>
						{product.colors.map((color, index) => {
							if (index === product.colorslenght + 1) return color.name;
							return color.name + ", ";
						})}
					</td>
					<td>{product.position}</td>
					<td>{product.createdAt}</td>
					<td>{product.updatedAt}</td>
					<td>
						<div className="custom-link">Update</div>
						<div className="custom-link">Delete</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default ProductTrash;
