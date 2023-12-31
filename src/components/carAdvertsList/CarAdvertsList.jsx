import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CarItemCard } from '../../components/carItemCard/CarItemCard'
import { fetchCarsThunk } from '../../redux/operations'
import { selectFilteredData, selectIsLoading } from '../../redux/selectors'
import { LoadMoreButton } from '../loadMoreButton/LoadMoreButton'
import {
	CarAdvertContainerStyled,
	CarAdvertTrableStyled,
	ListItemStyled,
	MainContainerStyled,
} from './CarAdvertsList.styled'
import { Loader } from '../loader/Loader'
export const CarAdvertsList = () => {
	const [visibleAdverts, setVisibleAdverts] = useState(8)
	const dispatch = useDispatch()
	const carAdverts = useSelector(selectFilteredData)
	const isLoading = useSelector(selectIsLoading)

	useEffect(() => {
		dispatch(fetchCarsThunk())
	}, [dispatch])

	const handleLoadMore = () => {
		setVisibleAdverts(prevVisible => prevVisible + 8)
	}
	return (
		<MainContainerStyled>
			{isLoading ? (
				<Loader />
			) : (
				<ListItemStyled>
					{carAdverts.length ? (
						carAdverts.slice(0, visibleAdverts).map(advert => (
							<CarAdvertContainerStyled key={advert.id}>
								<CarItemCard advert={advert} />
							</CarAdvertContainerStyled>
						))
					) : (
						<CarAdvertTrableStyled>There are no cars at your request</CarAdvertTrableStyled>
					)}
				</ListItemStyled>
			)}
			{carAdverts.length > 8 && carAdverts.length > visibleAdverts + 8 && <LoadMoreButton onClick={handleLoadMore} />}
		</MainContainerStyled>
	)
}
