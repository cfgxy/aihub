import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getResourceById, listCategories, listResources, listTypes } from "@/lib/repository";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { deleteResourceAction, logoutAction, saveResourceAction, toggleResourceAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "资源管理", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ edit?: string; new?: string; saved?: string; deleted?: string; error?: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const query = await searchParams;
  const resources = listResources({ includeDrafts: true });
  const types = listTypes();
  const categories = listCategories();
  const editing = query.edit ? getResourceById(Number(query.edit)) : null;
  const showForm = Boolean(query.new || editing);
  return <main className="admin-page"><header><div><strong>AI 工具集市</strong><span>资源管理</span></div><form action={logoutAction}><button>退出</button></form></header><div className="admin-container">
    {(query.saved || query.deleted) && <div className="notice">{query.deleted ? "条目已删除。" : "条目已保存。"}</div>}
    <div className="admin-toolbar"><div><h1>资源条目</h1><p>共 {resources.length} 项，公开站仅展示已上架条目。</p></div><a className="admin-primary" href="/admin?new=1">新建条目</a></div>
    {showForm && <form action={saveResourceAction} className="resource-form"><input type="hidden" name="id" value={editing?.id || ""}/><div className="form-heading"><h2>{editing ? `编辑 ${editing.name}` : "新建条目"}</h2><a href="/admin">关闭</a></div>
      {query.error && <div className="form-error">{query.error === "conflict" ? "Slug 已存在，或资源类型与主分类不匹配。" : "请补齐必填字段并检查 URL。"}</div>}
      <div className="form-grid"><label>名称 *<input name="name" required defaultValue={editing?.name}/></label><label>Slug *<input name="slug" pattern="[a-z0-9-]+" required defaultValue={editing?.slug}/></label>
      <label>资源类型 *<select name="typeId" required defaultValue={editing?.typeId}>{types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}</select></label>
      <label>主分类 *<select name="categoryId" required defaultValue={editing?.categoryId}>{types.map((type) => <optgroup key={type.id} label={type.name}>{categories.filter((category) => category.typeId === type.id).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</optgroup>)}</select></label>
      <label className="wide">一句话简介 *<textarea name="summary" required rows={2} defaultValue={editing?.summary}/></label><label className="wide">详细介绍<textarea name="description" rows={4} defaultValue={editing?.description}/></label>
      <label className="wide">标签（逗号分隔）<input name="tags" defaultValue={editing?.tags.join(", ")}/></label><label>官方 URL *<input name="officialUrl" type="url" required defaultValue={editing?.officialUrl}/></label><label>来源 URL<input name="sourceUrl" type="url" defaultValue={editing?.sourceUrl}/></label>
      <label className="wide">安装说明 / 命令<textarea name="installGuide" rows={4} defaultValue={editing?.installGuide}/></label><label className="wide">MCP 配置<textarea name="configText" rows={5} defaultValue={editing?.configText}/></label>
      <label>图标 URL<input name="iconUrl" type="url" defaultValue={editing?.iconUrl}/></label><label>状态<select name="status" defaultValue={editing?.status || "draft"}><option value="draft">草稿</option><option value="published">已上架</option></select></label></div><button className="admin-primary" type="submit">保存条目</button></form>}
    <div className="admin-table-wrap"><table><thead><tr><th>名称</th><th>类型</th><th>分类</th><th>状态</th><th>更新时间</th><th>操作</th></tr></thead><tbody>{resources.map((resource) => <tr key={resource.id}><td><strong>{resource.name}</strong><small>{resource.slug}</small></td><td>{resource.typeName}</td><td>{resource.categoryName}</td><td><span className={`status ${resource.status}`}>{resource.status === "published" ? "已上架" : "草稿"}</span></td><td>{resource.updatedAt.slice(0, 16)}</td><td className="actions"><a href={`/admin?edit=${resource.id}`}>编辑</a><form action={toggleResourceAction}><input type="hidden" name="id" value={resource.id}/><input type="hidden" name="status" value={resource.status === "published" ? "draft" : "published"}/>{resource.status === "published" ? <ConfirmSubmitButton message={`确认下架“${resource.name}”？`}>下架</ConfirmSubmitButton> : <button>上架</button>}</form><form action={deleteResourceAction}><input type="hidden" name="id" value={resource.id}/><ConfirmSubmitButton className="danger" message={`确认永久删除“${resource.name}”？此操作不可恢复。`}>删除</ConfirmSubmitButton></form></td></tr>)}</tbody></table></div>
  </div></main>;
}
