SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Busca el numero de documento
-- =============================================
ALTER PROCEDURE [EXX_Documento_Buscar] -- [EXX_Documento_Buscar] 5096, 2
	-- Add the parameters for the stored procedure here
	@P_DocEntry int,
	@P_Tipo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF @P_Tipo = 1
	BEGIN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum",
				"pec"."DocDueDate",
				"pec"."DocDate",
				"pec"."TaxDate",
				"pec"."CardCode",
				"pec"."CardName",
				"pec"."ShipToCode",
				"pec"."Address2",
				"pec"."GroupNum",
				"pec"."Comments",
				"pec"."DocCur",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				"ped"."LineTotal",
				"ped"."TaxCode",
				"ped"."UomCode",
				"ped"."UomEntry",
				"ped"."WhsCode",
				"ped"."Project",
				"ped"."OcrCode",
				"ped"."OcrCode2",
				"ped"."OcrCode3",
				"ped"."OcrCode4",
				"ped"."OcrCode5",
				CASE WHEN "bor"."DocEntry" IS NULL THEN 'Y' ELSE 'N' END AS "Estado"
		FROM OQUT AS "pec" 
		INNER JOIN QUT1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		LEFT  JOIN DRF1 AS "bor" ON "bor"."BaseEntry" = "ped"."DocEntry"
								AND "bor"."BaseLine" = "ped"."LineNum"
								AND "bor"."BaseType" = "ped"."ObjType"
		WHERE "ped"."DocEntry" = @P_DocEntry
	END

	IF @P_Tipo = 2
	BEGIN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum",
				"pec"."DocDueDate",
				"pec"."DocDate",
				"pec"."TaxDate",
				"pec"."CardCode",
				"pec"."CardName",
				"pec"."ShipToCode",
				"pec"."Address2",
				"pec"."GroupNum",
				"pec"."Comments",
				"pec"."DocCur",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				"ped"."LineTotal",
				"ped"."TaxCode",
				"ped"."UomCode",
				"ped"."UomEntry",
				"ped"."WhsCode",
				"ped"."Project",
				"ped"."OcrCode",
				"ped"."OcrCode2",
				"ped"."OcrCode3",
				"ped"."OcrCode4",
				"ped"."OcrCode5",
				'N' AS "Estado"
		FROM ORDR AS "pec" 
		INNER JOIN RDR1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		WHERE "ped"."DocEntry" = @P_DocEntry
	END

	IF @P_Tipo = 3
	BEGIN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum",
				"pec"."DocDueDate",
				"pec"."DocDate",
				"pec"."TaxDate",
				"pec"."CardCode",
				"pec"."CardName",
				"pec"."ShipToCode",
				"pec"."Address2",
				"pec"."GroupNum",
				"pec"."Comments",
				"pec"."DocCur",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				"ped"."LineTotal",
				"ped"."TaxCode",
				"ped"."UomCode",
				"ped"."UomEntry",
				"ped"."WhsCode",
				"ped"."Project",
				"ped"."OcrCode",
				"ped"."OcrCode2",
				"ped"."OcrCode3",
				"ped"."OcrCode4",
				"ped"."OcrCode5",
				'N' AS "Estado"
		FROM ODRF AS "pec" 
		INNER JOIN DRF1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		WHERE "ped"."DocEntry" = @P_DocEntry
	END
END
GO
