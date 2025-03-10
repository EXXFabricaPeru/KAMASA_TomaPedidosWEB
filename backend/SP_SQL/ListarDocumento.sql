
/****** Object:  StoredProcedure [dbo].[EXX_PedidoVentaxVendedor_Listar]    Script Date: 20/09/2023 15:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista de documentos pedido / cotizacion
-- =====================================================
ALTER PROCEDURE [dbo].[EXX_PedidoVentaxVendedor_Listar] 
	-- Add the parameters for the stored procedure here
	@P_Vendedor Int,
	@P_FecIni varchar(8),
	@P_FecFin varchar(8),
	@P_Tipo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF (@P_Tipo = 1)
	BEGIN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				"pec"."DocTotal" as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				'Cotizacion' As "Estado"
		FROM "OQUT" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = @P_Vendedor
		  AND ("pec"."DocDate" >= @P_FecIni OR '0' = @P_FecIni)
		  AND ("pec"."DocDate" <= @P_FecFin OR '0' = @P_FecFin)
	END
	ELSE
	BEGIN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				"pec"."DocTotal" as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				'Creado' as "Estado"
		FROM "ORDR" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = @P_Vendedor
		  AND ("pec"."DocDate" >= @P_FecIni OR '0' = @P_FecIni)
		  AND ("pec"."DocDate" <= @P_FecFin OR '0' = @P_FecFin)
		
		UNION ALL

		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				"pec"."DocTotal" as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				CASE WHEN ISNULL("pec"."U_EXK_AUTPED", 'N') = 'N' THEN 'PENDIENTE' ELSE 'APROBADO' END as "Estado"
		FROM "ODRF" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = @P_Vendedor
		  AND ("pec"."DocDate" >= @P_FecIni OR '0' = @P_FecIni)
		  AND ("pec"."DocDate" <= @P_FecFin OR '0' = @P_FecFin)
	END
END
