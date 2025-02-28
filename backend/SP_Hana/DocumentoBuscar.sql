ALTER PROCEDURE "EXX_TPED_Documento_Buscar"
(
	IN P_DocEntry int,
	IN P_Tipo int
)
AS
BEGIN

	IF :P_Tipo = 1 THEN
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
				"pec"."BPLId",
				"pec"."Series",
				"pec"."U_EXX_TIPOOPER" "TpoOperacion",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "ped"."LineTotal" ELSE "ped"."TotalFrgn" END"LineTotal",
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
				CASE WHEN "bor"."DocEntry" IS NULL THEN 'Y' ELSE 'N' END AS "Estado",
				(SELECT	"CompnyName" FROM OADM) "Compania",
				(SELECT	"CompnyAddr" FROM OADM) "CompaniaDir",
				(SELECT	COALESCE("Phone1", '') || ' / ' || COALESCE("Phone2", '') FROM OADM)  "CompaniaTel",
				(SELECT	"E_Mail" FROM OADM) "CompaniaMail",
				(SELECT	"TaxIdNum" FROM OADM) "CompaniaRuc"
		FROM OQUT AS "pec" 
		INNER JOIN QUT1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		LEFT  JOIN DRF1 AS "bor" ON "bor"."BaseEntry" = "ped"."DocEntry"
								AND "bor"."BaseLine" = "ped"."LineNum"
								AND "bor"."BaseType" = "ped"."ObjType"
		WHERE "ped"."DocEntry" = :P_DocEntry;
	END If;

	IF :P_Tipo = 2 THEN
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
				"pec"."BPLId",
				"pec"."Series",
				"pec"."U_EXX_TIPOOPER" "TpoOperacion",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "ped"."LineTotal" ELSE "ped"."TotalFrgn" END"LineTotal",
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
				'N' AS "Estado",
				(SELECT	"CompnyName" FROM OADM) "Compania",
				(SELECT	"CompnyAddr" FROM OADM) "CompaniaDir",
				(SELECT	COALESCE("Phone1", '') || ' / ' || COALESCE("Phone2", '') FROM OADM)  "CompaniaTel",
				(SELECT	"E_Mail" FROM OADM) "CompaniaMail",
				(SELECT	"TaxIdNum" FROM OADM) "CompaniaRuc"
		FROM ORDR AS "pec" 
		INNER JOIN RDR1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		WHERE "ped"."DocEntry" = :P_DocEntry;
	END IF;

	IF :P_Tipo = 3 THEN	
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
				"pec"."BPLId",
				"pec"."Series",
				"pec"."U_EXX_TIPOOPER" "TpoOperacion",
				"ped"."ItemCode",
				"ped"."Dscription",
				"ped"."Price",
				"ped"."Quantity",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "ped"."LineTotal" ELSE "ped"."TotalFrgn" END"LineTotal",
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
				'NB' AS "Estado",
				(SELECT	"CompnyName" FROM OADM) "Compania",
				(SELECT	"CompnyAddr" FROM OADM) "CompaniaDir",
				(SELECT	COALESCE("Phone1", '') || ' / ' || COALESCE("Phone2", '') FROM OADM)  "CompaniaTel",
				(SELECT	"E_Mail" FROM OADM) "CompaniaMail",
				(SELECT	"TaxIdNum" FROM OADM) "CompaniaRuc"
		FROM ODRF AS "pec" 
		INNER JOIN DRF1 AS "ped" ON "pec"."DocEntry" = "ped"."DocEntry"
		WHERE "ped"."DocEntry" = :P_DocEntry;		
	END IF;
END;