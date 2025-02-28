CREATE PROCEDURE "EXX_TPED_EstadoCuentaCliente_Listar" 
(
	IN P_Codigo nvarchar(15)
)
LANGUAGE SQLSCRIPT AS
BEGIN

	SELECT 
		T0."DocNum" "Nro SAP",
		'FACTURA' "Tipo",
		T0."CardName" "Socio de Negocio",
		T0."LicTradNum" "RUC",
		T0."Address",
		T0."FolioPref" || ' - ' || CAST(T0."FolioNum" AS NVARCHAR(8)) "Nro Legal",
		T0."DocDueDate" "F.Vencimiento",
		T0."DocCur" "Moneda",
		CASE T0."DocCur" WHEN 'SOL' THEN T0."DocTotal" ELSE 0 END "Total Soles",
		CASE T0."DocCur" WHEN 'USD' THEN T0."DocTotalFC" ELSE 0 END "Total Dolares",
		CASE T0."DocCur" WHEN 'SOL' THEN T0."DocTotal" - T0."PaidToDate" ELSE 0 END "Saldo Soles",
		CASE T0."DocCur" WHEN 'USD' THEN T0."DocTotalFC" - T0."PaidSys" ELSE 0 END "Saldo Dolares",
		(SELECT T1."PymntGroup" FROM OCTG T1 WHERE T1."GroupNum"=T0."GroupNum") "Tipo Pago",
		DAYS_BETWEEN(t0."DocDueDate", CURRENT_DATE)  "Dias Vencidos"
		--,T0."PaidToDate", T0."PaidSum",T0."PaidSys",T0."PaidSum",T0."PaidSumFc"
	FROM OINV T0 
	WHERE "DocStatus"='O' 
	  --AND T0."PaidToDate" <> T0."PaidSum"
	  AND T0."DocDueDate"<=CURRENT_DATE
	  and T0."CardCode" = :P_Codigo
	
	UNION ALL
	
	SELECT 
		T0."DocNum" "Nro SAP",
		'NOTA CREDITO' "Tipo",
		T0."CardName" "Socio de Negocio",
		T0."LicTradNum" "RUC",
		T0."Address",
		T0."FolioPref" || ' - ' || CAST(T0."FolioNum" AS NVARCHAR(8)) "Nro Legal",
		T0."DocDueDate" "F.Vencimiento",
		T0."DocCur" "Moneda",
		CASE T0."DocCur" WHEN 'SOL' THEN T0."DocTotal" ELSE 0 END "Total Soles",
		CASE T0."DocCur" WHEN 'USD' THEN T0."DocTotalFC" ELSE 0 END "Total Dolares",
		CASE T0."DocCur" WHEN 'SOL' THEN T0."DocTotal" - T0."PaidToDate" ELSE 0 END "Saldo Soles",
		CASE T0."DocCur" WHEN 'USD' THEN T0."DocTotalFC" - T0."PaidSys" ELSE 0 END "Saldo Dolares",
		(SELECT T1."PymntGroup" FROM OCTG T1 WHERE T1."GroupNum"=T0."GroupNum") "Tipo Pago",
		DAYS_BETWEEN(t0."DocDueDate", CURRENT_DATE)  "Dias Vencidos"
	FROM ORIN T0 
	WHERE "DocStatus"='O' 
	AND T0."DocDueDate"<=CURRENT_DATE
	and T0."CardCode" = :P_Codigo;

END;