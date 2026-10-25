import { A, type DiapersConfig } from "./shared";
import { updateDiaper } from "../services/diapersService";

  export function DiapersAdmin({ diapers, setDiapers }: { diapers: DiapersConfig[]; setDiapers: (d: DiapersConfig[]) => void }) {
      const update = async (
      tamanho: string,
      field: "necessario" | "escolhido",
      val: number
    ) => {
      const anterior = diapers;

      const atualizados = diapers.map((d) =>
        d.tamanho === tamanho
          ? { ...d, [field]: Math.max(0, val) }
          : d
      );

      setDiapers(atualizados);

      try {
        await updateDiaper(tamanho, field, val);
      } catch (error) {
        setDiapers(anterior);
        alert(
          error instanceof Error
            ? error.message
            : "Não foi possível salvar as alterações."
        );
      }
    };

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600, marginBottom: "1.5rem" }}>Fraldas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diapers.map((d) => {
          const disponivel = d.necessario - d.escolhido;
          const pct = d.necessario > 0 ? (d.escolhido / d.necessario) * 100 : 0;
          return (
            <div key={d.tamanho} style={{ ...A.card, overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "18px 20px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tamanho</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", color: "#914e68", fontWeight: 600, lineHeight: 1 }}>{d.tamanho}</p>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ height: 6, borderRadius: 3, background: "#eadde5", overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: "linear-gradient(90deg, #a85f78, #bd7f93)" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={A.label}>Necessário</label>
                    <input type="number" min={0} value={d.necessario} onChange={(e) => update(d.tamanho, "necessario", +e.target.value)} style={A.inputStyle} />
                  </div>
                  <div>
                    <label style={A.label}>Escolhido</label>
                    <input type="number" min={0} max={d.necessario} value={d.escolhido} onChange={(e) => update(d.tamanho, "escolhido", +e.target.value)} style={A.inputStyle} />
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86", marginTop: 10, textAlign: "center" }}>
                  {disponivel} disponíveis
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
