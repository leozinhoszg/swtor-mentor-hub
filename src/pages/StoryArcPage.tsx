import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section, Card, SectionTitle } from "@/components/GuideComponents";
import storyArcData from "@/assets/mid-game/story_arc.json";

/* ─── Types ─── */
type NodeData = (typeof storyArcData.nodes)[0];
type EdgeData = (typeof storyArcData.edges)[0];

/* ─── Color maps ─── */
const nodeTypeClass: Record<string, string> = {
  core_story: "fc-node--story",
  flashpoint: "fc-node--flashpoint",
  operation: "fc-node--operation",
  chapter: "fc-node--chapter",
};

const badgeColors: Record<string, string> = {
  core_story: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  flashpoint: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  operation: "bg-red-500/20 text-red-400 border-red-500/30",
  chapter: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const expansionColors: Record<string, string> = {
  exp_class: "bg-amber-600/80 hover:bg-amber-600",
  exp_rothc: "bg-orange-600/80 hover:bg-orange-600",
  exp_sor: "bg-cyan-700/80 hover:bg-cyan-700",
  exp_kotfe: "bg-purple-700/80 hover:bg-purple-700",
  exp_kotet: "bg-purple-600/80 hover:bg-purple-600",
  exp_onslaught: "bg-red-700/80 hover:bg-red-700",
  exp_lots: "bg-emerald-700/80 hover:bg-emerald-700",
};

const tierColors: Record<string, string> = {
  free: "text-green-400",
  premium: "text-amber-400",
};

/* ─── Helpers ─── */
const { expansions, nodes, edges } = storyArcData;

function getNodeById(id: string): NodeData | undefined {
  return nodes.find((n) => n.id === id);
}

function getEdgesFrom(nodeId: string): EdgeData[] {
  return edges.filter((e) => e.from === nodeId);
}

function getEdgeTo(nodeId: string): EdgeData | undefined {
  return edges.find((e) => e.to === nodeId);
}

function getNodeType(node: NodeData): string {
  if (node.type === "operation") return "operation";
  if (node.type === "flashpoint") return "flashpoint";
  if (node.type === "chapter") return "chapter";
  return "core_story";
}

function isOptional(nodeId: string): boolean {
  const edge = getEdgeTo(nodeId);
  return edge?.relation === "optional";
}

/* ─── Build a linear sequence for each expansion, with branches ─── */
interface FlowStep {
  type: "node" | "branch" | "diamond";
  node?: NodeData;
  optional?: boolean;
  left?: NodeData;
  right?: NodeData;
  leftOptionals?: NodeData[];
  rightOptionals?: NodeData[];
  label?: string;
}

function buildExpansionFlow(expansionId: string): FlowStep[] {
  const expNodes = nodes.filter((n) => n.expansion_id === expansionId);
  if (expNodes.length === 0) return [];

  const steps: FlowStep[] = [];
  const visited = new Set<string>();

  // Find entry node: the first node that has no incoming edge from within this expansion
  const expNodeIds = new Set(expNodes.map((n) => n.id));
  const hasInternalIncoming = new Set(
    edges.filter((e) => expNodeIds.has(e.from) && expNodeIds.has(e.to)).map((e) => e.to)
  );
  const entryNodes = expNodes.filter((n) => !hasInternalIncoming.has(n.id));
  const entryNode = entryNodes[0] || expNodes[0];

  function walk(nodeId: string) {
    if (visited.has(nodeId)) return;
    const node = getNodeById(nodeId);
    if (!node || node.expansion_id !== expansionId) return;
    visited.add(nodeId);

    const outEdges = getEdgesFrom(nodeId);
    const branches = outEdges.filter((e) => e.relation === "branch");
    const optionals = outEdges.filter(
      (e) => e.relation === "optional" && getNodeById(e.to)?.expansion_id === expansionId
    );
    const nexts = outEdges.filter(
      (e) => e.relation === "next" && getNodeById(e.to)?.expansion_id === expansionId
    );

    // Add this node
    const opt = isOptional(nodeId);
    steps.push({ type: "node", node, optional: opt });

    // Handle branches (Republic/Empire fork)
    if (branches.length === 2) {
      const leftNode = getNodeById(branches[0].to);
      const rightNode = getNodeById(branches[1].to);
      if (leftNode && rightNode) {
        visited.add(leftNode.id);
        visited.add(rightNode.id);

        // Get optionals for each branch
        const leftOpts = getEdgesFrom(leftNode.id)
          .filter((e) => e.relation === "optional")
          .map((e) => getNodeById(e.to))
          .filter(Boolean) as NodeData[];
        const rightOpts = getEdgesFrom(rightNode.id)
          .filter((e) => e.relation === "optional")
          .map((e) => getNodeById(e.to))
          .filter(Boolean) as NodeData[];

        leftOpts.forEach((n) => visited.add(n.id));
        rightOpts.forEach((n) => visited.add(n.id));

        steps.push({
          type: "branch",
          left: leftNode,
          right: rightNode,
          leftOptionals: leftOpts,
          rightOptionals: rightOpts,
        });

        // Continue from branch nexts
        const leftNexts = getEdgesFrom(leftNode.id).filter(
          (e) => e.relation === "next" && getNodeById(e.to)?.expansion_id === expansionId
        );
        const rightNexts = getEdgesFrom(rightNode.id).filter(
          (e) => e.relation === "next" && getNodeById(e.to)?.expansion_id === expansionId
        );
        // They usually converge, pick the first unvisited next
        const allNexts = [...leftNexts, ...rightNexts];
        for (const e of allNexts) {
          if (!visited.has(e.to)) walk(e.to);
        }
        return;
      }
    }

    // Add optionals as side nodes after the main node
    if (optionals.length > 0) {
      for (const opt of optionals) {
        const optNode = getNodeById(opt.to);
        if (optNode && !visited.has(optNode.id)) {
          visited.add(optNode.id);
          steps.push({ type: "node", node: optNode, optional: true });
        }
      }
    }

    // Follow next edges
    for (const e of nexts) {
      if (!visited.has(e.to)) walk(e.to);
    }
  }

  walk(entryNode.id);

  // Add any remaining unvisited nodes
  for (const node of expNodes) {
    if (!visited.has(node.id)) {
      steps.push({ type: "node", node, optional: isOptional(node.id) });
    }
  }

  return steps;
}

/* ─── Node Component ─── */
const FlowNode = ({
  node,
  optional = false,
  compact = false,
}: {
  node: NodeData;
  optional?: boolean;
  compact?: boolean;
}) => {
  const { t } = useTranslation("storyArc");
  const nType = getNodeType(node);
  const typeClass = nodeTypeClass[nType] || nodeTypeClass.core_story;
  const badge = badgeColors[nType] || badgeColors.core_story;
  const isRepublic = node.tags.includes("republic_path");
  const isEmpire = node.tags.includes("imperial_path");
  const factionClass = isRepublic ? "fc-republic" : isEmpire ? "fc-empire" : "";

  return (
    <div
      className={`fc-node ${typeClass} ${optional ? "fc-node--optional" : ""} ${factionClass} ${
        compact ? "py-1.5 px-3 min-w-[120px] text-xs" : ""
      }`}
    >
      <span
        className={`absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0 rounded text-[8px] font-bold uppercase tracking-wider border ${badge}`}
      >
        {t(`badges.${nType}`)}
      </span>
      <span className="text-foreground block mt-1">{node.name}</span>
      <div className="flex items-center justify-center gap-2 mt-0.5">
        {isRepublic && <span className="text-[9px] font-bold text-blue-400">REP</span>}
        {isEmpire && <span className="text-[9px] font-bold text-red-400">IMP</span>}
        {node.recommended_level && (
          <span className="text-[9px] text-muted-foreground font-oswald">
            {t("level")} {node.recommended_level}
          </span>
        )}
      </div>
      {optional && (
        <span className="text-[8px] text-muted-foreground/60 font-oswald uppercase mt-0.5 block">
          {t("relations.optional")}
        </span>
      )}
    </div>
  );
};

/* ─── Connector Line ─── */
const ConnectorLine = ({ height = 24, dashed = false }: { height?: number; dashed?: boolean }) => (
  <div
    className={`w-0.5 mx-auto ${dashed ? "border-l-2 border-dashed border-primary/30" : "fc-line"}`}
    style={{ height }}
  />
);

/* ─── Arrow Down ─── */
const ArrowDown = () => (
  <div className="flex flex-col items-center">
    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-primary/50" />
  </div>
);

/* ─── Main Page ─── */
const StoryArcPage = () => {
  const { t } = useTranslation("storyArc");
  const notes = t("notesList", { returnObjects: true }) as string[];
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToExpansion = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="font-cinzel font-bold text-4xl md:text-5xl text-gradient-gold">
              {t("pageTitle")}
            </h1>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="divider-gold mx-auto max-w-xs mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("pageDescription")}
          </motion.p>
        </div>
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          to="/conteudo/mid-game"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-oswald uppercase text-sm tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backLink")}
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24 max-w-5xl space-y-12">
        {/* Expansion Navigation */}
        <Section>
          <Card>
            <div className="flex flex-wrap gap-2 justify-center">
              {expansions.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => scrollToExpansion(exp.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer ${
                    expansionColors[exp.id] || "bg-primary/60 hover:bg-primary/80"
                  }`}
                >
                  {exp.name}
                </button>
              ))}
            </div>
          </Card>
        </Section>

        {/* Legend */}
        <Section>
          <Card>
            <SectionTitle>{t("legendTitle")}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {/* Content types */}
              <div>
                <h3 className="text-xs font-oswald uppercase tracking-wider text-muted-foreground mb-3">
                  {t("legendContentTypes")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(badgeColors).map(([type, cls]) => (
                    <span
                      key={type}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}
                    >
                      {t(`badges.${type}`)}
                    </span>
                  ))}
                </div>
              </div>
              {/* Relations */}
              <div>
                <h3 className="text-xs font-oswald uppercase tracking-wider text-muted-foreground mb-3">
                  {t("legendConnections")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-primary/50" />
                    <span className="text-xs text-muted-foreground">{t("relations.next")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0 border-t-2 border-dashed border-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground">{t("relations.optional")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <div className="w-3 h-0.5 bg-blue-400/60" />
                      <div className="w-3 h-0.5 bg-red-400/60" />
                    </div>
                    <span className="text-xs text-muted-foreground">{t("relations.branch")}</span>
                  </div>
                </div>
                {/* Factions */}
                <div className="flex gap-3 mt-3">
                  <span className="text-xs font-bold text-blue-400">
                    ● {t("factionRepublic")}
                  </span>
                  <span className="text-xs font-bold text-red-400">
                    ● {t("factionEmpire")}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Flowchart per expansion */}
        {expansions.map((exp, idx) => {
          const flow = buildExpansionFlow(exp.id);
          return (
            <Section key={exp.id} delay={0.05 + idx * 0.03}>
              <div
                ref={(el) => {
                  sectionRefs.current[exp.id] = el;
                }}
                className="scroll-mt-24"
              >
                <Card>
                  {/* Expansion header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                    <div>
                      <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-gradient-gold">
                        {exp.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground font-oswald uppercase tracking-wider">
                          {t("version")} {exp.major}
                        </span>
                        <span
                          className={`text-xs font-semibold font-oswald uppercase tracking-wider ${tierColors[exp.tier]}`}
                        >
                          {t(`tiers.${exp.tier}`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flow */}
                  <div className="flex flex-col items-center py-4">
                    {flow.map((step, i) => {
                      if (step.type === "branch" && step.left && step.right) {
                        return (
                          <div key={`branch-${i}`} className="w-full">
                            {/* Diamond decision */}
                            <div className="flex flex-col items-center mb-2">
                              <div className="fc-diamond flex items-center justify-center">
                                <span className="fc-diamond-label">?</span>
                              </div>
                            </div>

                            {/* Branch lines */}
                            <div className="relative flex justify-center gap-8 md:gap-16 mb-2">
                              {/* Left line */}
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(50%-16px)] md:w-[calc(50%-32px)] h-0 border-t-2 border-primary/30" />
                              <div className="absolute top-0 left-[calc(25%-8px)] md:left-[calc(25%-16px)] w-0 h-4 border-l-2 border-primary/30" />
                              <div className="absolute top-0 right-[calc(25%-8px)] md:right-[calc(25%-16px)] w-0 h-4 border-l-2 border-primary/30" />
                            </div>

                            {/* Branch nodes */}
                            <div className="flex justify-center gap-6 md:gap-12 mt-6">
                              {/* Left branch */}
                              <div className="flex flex-col items-center gap-2">
                                <FlowNode node={step.left} compact />
                                {step.leftOptionals?.map((opt) => (
                                  <div key={opt.id} className="flex flex-col items-center">
                                    <ConnectorLine height={12} dashed />
                                    <FlowNode node={opt} optional compact />
                                  </div>
                                ))}
                              </div>
                              {/* Right branch */}
                              <div className="flex flex-col items-center gap-2">
                                <FlowNode node={step.right} compact />
                                {step.rightOptionals?.map((opt) => (
                                  <div key={opt.id} className="flex flex-col items-center">
                                    <ConnectorLine height={12} dashed />
                                    <FlowNode node={opt} optional compact />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Converge line */}
                            <div className="flex flex-col items-center mt-2">
                              <ConnectorLine height={20} />
                              <ArrowDown />
                            </div>
                          </div>
                        );
                      }

                      if (step.type === "node" && step.node) {
                        const isFirst = i === 0;
                        return (
                          <div key={step.node.id} className="flex flex-col items-center">
                            {!isFirst && (
                              <>
                                <ConnectorLine
                                  height={step.optional ? 16 : 24}
                                  dashed={step.optional}
                                />
                                <ArrowDown />
                              </>
                            )}
                            <FlowNode node={step.node} optional={step.optional} />
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Connector to next expansion */}
                  {idx < expansions.length - 1 && (
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/10 mx-auto" />
                      <span className="text-[10px] font-oswald uppercase tracking-widest text-primary/40 mt-1">
                        ▼
                      </span>
                    </div>
                  )}
                </Card>
              </div>
            </Section>
          );
        })}

        {/* Notes */}
        <Section delay={0.1}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <SectionTitle>{t("notes")}</SectionTitle>
            </div>
            <ul className="space-y-2">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {note}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-4 font-oswald uppercase tracking-wider">
              {t("credit")}
            </p>
          </Card>
        </Section>
      </div>

      <Footer />
    </main>
  );
};

export default StoryArcPage;
